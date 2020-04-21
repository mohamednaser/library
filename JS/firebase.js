class customFirebase {
  // Your web app's Firebase configuration
  constructor() {
    var firebaseConfig = {
      apiKey: "AIzaSyCZTPTRei9rvurD925X8A352YhL5O414WQ",
      authDomain: "actual-upd.firebaseapp.com",
      databaseURL: "https://actual-upd.firebaseio.com",
      projectId: "actual-upd",
      storageBucket: "actual-upd.appspot.com",
      messagingSenderId: "386902349801",
      appId: "1:386902349801:web:34886ae783e0a98b809d78",
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }

  listBooks() {
    const booksList = document.getElementById("books-list");
    const dbRefObject = firebase.database().ref().child("Books");
    dbRefObject.on("value", (snap) => {
      let books = snap.val();
      const keys = Object.keys(books);

      let bookDetails;
      for (const key of keys) {
        bookDetails = books[key];
        var cardDetail = "";
        cardDetail += "<div class='card' style='width: 18rem;'>";
        cardDetail += "<div class='card-body'>";
        cardDetail += "<h5 class='card-title'>" + bookDetails.Title + "</h5>";
        cardDetail +=
          "<h6 class='card-subtitle mb-2 text-muted'>" +
          bookDetails.Author_name +
          "</h6>";
        cardDetail += " <p class='card-text'>";
        cardDetail += bookDetails.Description;
        cardDetail += "<br><br>";
        cardDetail +=
          " Number Of Pages :  <span class= 'badge badge-secondary'>" +
          bookDetails.Number_pages +
          "</span>";
        cardDetail += "</p>";
        if (bookDetails.isRead)
          cardDetail += "<span class='text-success'>readed</span>";
        else cardDetail += "<span class='text-danger'> not readed  </span>";

        cardDetail += "<br>";
        cardDetail +=
          "<button onclick='updateBook(" +
          key +
          "," +
          !bookDetails.isRead +
          ")'class='btn btn-success'>";
        cardDetail += "Change Status";

        cardDetail += " </button>";
        cardDetail +=
          "<button onclick='removeBook(" + key + ")'class='btn btn-danger'>";
        cardDetail += "Remove";

        cardDetail += " </button>";
        cardDetail += "</div>";
        cardDetail += "</div>";

        booksList.innerHTML += cardDetail;
      }
    });
  }

  createBook(authorName, title, description, pagesNumber, isRead) {
    const current_time = new Date().getTime();
    firebase
      .database()
      .ref("Books/" + current_time)
      .set({
        Author_name: authorName,
        Title: title,
        Number_pages: pagesNumber,
        Description: description,
        isRead: isRead,
      });
    document.getElementById("books-list").innerHTML = " ";
    this.listBooks();
  }

  updateBook(bookid, status) {
    firebase.database().ref("Books").child(bookid).update({ isRead: status });

    document.getElementById("books-list").innerHTML = " ";
    this.listBooks();
  }

  removeBook(bookid) {
    console.log("remove book", bookid);

    firebase
      .database()
      .ref("Books/" + bookid)
      .remove();
    document.getElementById("books-list").innerHTML = " ";
    this.listBooks();
  }
}

export default customFirebase;
