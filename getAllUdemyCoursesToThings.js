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

async function getAllUdemyCoursesToThings() {
  let { results: courses } = await getData(
    "https://www.udemy.com/api-2.0/courses/?page_size=1000"
  );
  const projects = courses.map(async (course) => {
    const { results: lectures } = await getData(
      `https://www.udemy.com/api-2.0/courses/${course.id}/public-curriculum-items/?page_size=1000`
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
        title: course.title,
        items,
      },
    };
  });

  return projects;
}

getAllUdemyCoursesToThings().then((projects) =>
  Promise.all(projects).then((projects) => {
    projects.forEach((project) => {
      console.log(project.attributes.title, "\n");
      const jsonRequest = encodeURIComponent(`[${JSON.stringify(project)}]`);
      const thingsURL = `things:///json?data=${jsonRequest}`;
      console.log(thingsURL, "\n");
    });
  })
);
