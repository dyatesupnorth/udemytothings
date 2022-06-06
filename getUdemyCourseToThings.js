import fetch from "node-fetch";

async function getData(url) {
  const response = await fetch(url, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      Accept: "application/json, text/plain, */*",
      Authorization: "",
      "Content-Type": "application/json;charset=utf-8",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });
  return response.json();
}

async function getUdemyCourse(id, title) {
  const { results: lectures } = await getData(
    `https://www.udemy.com/api-2.0/courses/${id}/public-curriculum-items/?page_size=1000`
  );
  const items = lectures.map((lecture) => {
    let { _class: type, title } = lecture;
    return {
      type: type === "chapter" ? "heading" : "to-do",
      attributes: {
        title,
      },
    };
  });

  return {
    type: "project",
    attributes: {
      title,
      items,
    },
  };
}

getUdemyCourse(1587718, "Node JS: Advanced Concepts").then((project) => {
  console.log(project.attributes.title, "\n");
  const jsonRequest = encodeURIComponent(`[${JSON.stringify(project)}]`);
  const thingsURL = `things:///json?data=${jsonRequest}`;
  console.log(thingsURL, "\n");
});
