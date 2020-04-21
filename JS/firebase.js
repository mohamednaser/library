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
    console.log("initalize firebase");
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }

  listBooks() {
    const booksList = document.getElementById("books-list");
    booklist.innerHTML = "";
    const dbRefObject = firebase.database().ref().child("Books");
    dbRefObject.on("value", (snap) => {
      let books = snap.val();
      const keys = Object.keys(books);

      let bookDetails;
      for (const key of keys) {
        console.log(bookDetails);
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
        cardDetail += "</p>";
        cardDetail += "<span onclick='updateBook("+key+")'class='card-link'>";
        cardDetail += "readed";
        cardDetail += " </span>";
        cardDetail += bookDetails.Number_pages + " page";
        cardDetail += "</div>";
        cardDetail += "</div>";

        booksList.innerHTML += cardDetail;
      }
    });
  }

  createBook(authorName, title, description, pagesNumber, isRead) {
    console.log("create new book");
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
  }

  updateBook(bookid){
  
    firebase
      .database()
      .ref("Books")
      .child(bookid)
      .update({Author_name: 'PETER'});

    console.log("inside")
  }


}

export default customFirebase;
