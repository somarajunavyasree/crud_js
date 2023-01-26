function displayData(dataI) {
  // console.log(this._todos);

  dataI.forEach((todo, ind) => {
    console.log(todo.id, "id  qw");
    const html = `
    <tr class="item" id="items">
            <td>${todo.userid}</td>
            <td>${todo.id}</td>
            <td contenteditable="true" class="edit title ${ind}">${todo.title}</td>
            <td contenteditable="true"  class="edit completed ${ind}">${todo.completed}</td>
            <td class="delete"  ><button class="icon" ><img class="btn ${todo.id}" src = 'delete.png' style="width : 20px"></button></tb>
            <td class="save"  ><button class="icon" ><img class="$btns {ind} " src = 'savei.png' style="width : 20px"></button></tb>
        </tr>
    `;
    document.querySelector(".element").insertAdjacentHTML("afterend", html);
  });
  //to delete items from table
  const jsond = dataI;
  const btn = document.querySelectorAll(".btn");
  btn.forEach((b) =>
    b.addEventListener("click", function (e) {
      console.log(e.target.classList);
      elemId = e.target.classList[1];
      console.log("id", elemId);
      (async function () {
        // http://localhost:8080/getTodo
        const res = await fetch(`http://localhost:8080/delete/${elemId}`, {
          method: "DELETE",
        });
        console.log("deleted");
        if (res.status == 200) {
          console.log(elemId);
          jsond.forEach((d, ind) => {
            if (d.id == elemId) {
              console.log("match test");
              elemId = ind;
            }
          });
          console.log(elemId, "index");

          let temp = jsond.splice(elemId, 1);
          document.querySelectorAll(".item").forEach((i) => i.remove());
          document.querySelectorAll(".item").forEach((i) => (i.innerHTML = ""));
          console.log(jsond);
          displayData(jsond);
          // localStorage.setItem("todos", JSON.stringify(jsond));
        }
      })();
    })
  );

  //to update elements in table
  const edits = document.querySelectorAll(".edit");
  const saveb = document.querySelector(".save");
  // saveb.addEventListener("click", () => console.log("manikanta"));
  edits.forEach((e) => {
    e.addEventListener("keydown", function (e) {
      const elem = e.target;
      console.log(elem);
      saveb.addEventListener("click", function (e) {
        console.log(jsond[elem.classList[2]].id);
        console.log(elem.classList);
        (async function () {
          // console.log(e);
          if (elem.classList[1] == "title") {
            console.log("fetching..test");
            let res = await fetch(
              `http://localhost:8080/update/${jsond[elem.classList[2]].id}`,
              {
                method: "PATCH",
                body: JSON.stringify({
                  title: elem.innerHTML,
                }),
                headers: {
                  "Content-type": "application/json; charset=UTF-8",
                },
              }
            );
            console.log("fetch success...test");
            console.log(res);
            let updated = false;
            if (res.status == 200) {
              if (elem.classList[1] == "completed") {
                // console.log("status updateing");
                jsond[elem.classList[2]].completed = elem.innerHTML;
              } else if (elem.classList[1] == "title") {
                // console.log("title updating");
                console.log("title");
                jsond[elem.classList[2]].title = elem.innerHTML;
              }
              // console.log(jsond);
              document.querySelectorAll(".item").forEach((i) => i.remove());
              document
                .querySelectorAll(".item")
                .forEach((i) => (i.innerHTML = ""));
              console.log(jsond);
              // localStorage.setItem("todos", JSON.stringify(jsond));
              displayData(jsond);
              updated = true;
            }
            if (updated) console.log("updated");
          } else if (elem.classList[1] == "completed") {
            console.log("fetching..test");
            let res = await fetch(
              `http://localhost:8080/update/${jsond[elem.classList[2]].id}`,
              {
                method: "PATCH",
                body: JSON.stringify({
                  completed: elem.innerHTML,
                }),
                headers: {
                  "Content-type": "application/json; charset=UTF-8",
                },
              }
            );
            console.log("fetch success...test");
            console.log(res);
            let updated = false;
            if (res.status == 200) {
              if (elem.classList[1] == "completed") {
                // console.log("status updateing");
                jsond[elem.classList[2]].completed = elem.innerHTML;
              } else if (elem.classList[1] == "title") {
                // console.log("title updating");
                console.log("title");
                jsond[elem.classList[2]].title = elem.innerHTML;
              }
              // console.log(jsond);
              document.querySelectorAll(".item").forEach((i) => i.remove());
              document
                .querySelectorAll(".item")
                .forEach((i) => (i.innerHTML = ""));
              console.log(jsond);
              // localStorage.setItem("todos", JSON.stringify(jsond));
              displayData(jsond);
              updated = true;
            }
            if (updated) console.log("updated");
          }
        })();
      });
    });
  });
}
function print() {
  console.log("hell");
}
async function renderData() {
  console.log("Rendering..");
  // if (localStorage.todos == null || localStorage.todos.length == 2) {
  const response = await fetch("http://localhost:8080/todo"); //addTodo
  const json = await response.json();
  console.log(json);
  let jsond = json;
  // localStorage.setItem("todos", JSON.stringify(jsond));
  displayData(jsond);
  let data = jsond;
  const asc = document.querySelector(".idasc");
  asc.addEventListener("click", function (e) {
    // console.log(jsond);

    data.sort(compare);
    document.querySelectorAll(".item").forEach((i) => i.remove());
    document.querySelectorAll(".item").forEach((i) => (i.innerHTML = ""));
    displayData(data);
  });
  const dec = document.querySelector(".iddesc");
  dec.addEventListener("click", function (e) {
    data.sort(compare2);
    document.querySelectorAll(".item").forEach((i) => i.remove());
    document.querySelectorAll(".item").forEach((i) => (i.innerHTML = ""));
    displayData(data);
  });
  const titasc = document.querySelector(".titleasc");
  titasc.addEventListener("click", function (e) {
    data.sort(comparet);
    document.querySelectorAll(".item").forEach((i) => i.remove());
    document.querySelectorAll(".item").forEach((i) => (i.innerHTML = ""));
    displayData(data);
  });
  const titdsc = document.querySelector(".titledesc");
  titdsc.addEventListener("click", function (e) {
    data.sort(comparet2);
    document.querySelectorAll(".item").forEach((i) => i.remove());
    document.querySelectorAll(".item").forEach((i) => (i.innerHTML = ""));
    displayData(data);
  });
  const compare = function (a, b) {
    if (a.id > b.id) return -1;
    if (a.id < b.id) return 1;
    return 0;
  };
  const compare2 = function (a, b) {
    if (a.id > b.id) return 1;
    if (a.id < b.id) return -1;
    return 0;
  };
  const comparet = function (a, b) {
    if (a.title > b.title) return -1;
    if (a.title < b.title) return 1;
    return 0;
  };
  const comparet2 = function (a, b) {
    if (a.title > b.title) return 1;
    if (a.title < b.title) return -1;
    return 0;
  };

  const newitem = document.querySelector(".new");
  const newSub = document.querySelector(".submit");
  const inpuid = document.querySelector(".userid");
  // const inpid = document.querySelector(".id");
  const inptitle = document.querySelector(".title");
  const inpstatus = document.querySelector(".status");
  newitem.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(".hidden").style.opacity = 10;
  });
  newSub.addEventListener("click", function (e) {
    e.preventDefault();
    (async function () {
      let newtodo = {};
      newtodo.userid = Number.parseInt(inpuid.value);
      // newtodo.id = parseInt(inpid.value);
      newtodo.title = inptitle.textContent;
      newtodo.completed = inpstatus.value;
      const res = await fetch("http://localhost:8080/post", {
        method: "POST",
        body: JSON.stringify({
          userid: newtodo.userid,
          // id: newtodo.id,
          title: newtodo.title,
          completed: newtodo.completed,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      // console.log(res);
      if (res.status == 200) {
        console.log("Add new item");
        console.log(newtodo);
        // const data = JSON.parse(localStorage.getItem("todos"));
        // console.log(data);
        console.log(newtodo.title);
        jsond.push(newtodo);
        document.querySelectorAll(".item").forEach((i) => i.remove());
        document.querySelectorAll(".item").forEach((i) => (i.innerHTML = ""));
        // localStorage.setItem("todos", JSON.stringify(data));
        renderData(jsond);
        document.querySelector(".hidden").style.opacity = 0;
        inpuid.value = inptitle.value = inpstatus.value = "";
        console.log("added");
      }
    })();
  });
}

// function getlocalstorage() {
//   const data = JSON.parse(localStorage.getItem("todos"));
//   // console.log(data);
//   if (!data) return;
//   this._todos = data;
//   // console.log(this._todos);
// }

function search() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("todolist");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[2];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

renderData();
// getlocalstorage();
