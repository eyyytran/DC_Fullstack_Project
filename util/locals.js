const getTitle = (route) => {
  const routeToTitleMap = {
    index: "Home | Trelljoe",
    signup: "Sign Up",
    login: "Log In",
    dashboard: "Dashboard",
    project: "Project",
  };
  return routeToTitleMap[route];
};

const getScript = (route) =>
  `<script defer src="/public/js/${route}.js"></script>`;

// module.exports = {
//   getTitle,
//   getScript,
// };

const createUser = async () => {
  const username = document.getElementById("username-input").value;
  const password = document.getElementById("password-input").value;
  const passwordConfirm = document.getElementById("password-confirm").value;
  const email = document.getElementById("email-input").value;
  if (password !== passwordConfirm) {
    return "some kind of feedback";
  } else {
    const userToCreate = {
      username,
      password,
      email,
    };
    const send = await fetch("http://localhost:3001/users/register", {
      method: "POST",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(userToCreate),
    });
    const json = await send.json()
    console.log(json)
  }
};