const express = require("express");
const app = express();
const date = require(__dirname + "/date.js");

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));
app.set("view engine","ejs")

let items = ["Bread", "Milk", "Dog Food"];
let workItems = [];

app.get("/", function(req, res) {
  let day = date.getDate();

  res.render("list", {
    listTitle: day,
    newListItems: items
  });
});

app.post("/", function(req, res) {
  console.log(req.body);
  let item = req.body.newItem;
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  });
});

app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
