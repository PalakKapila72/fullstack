async function getUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();

    const firstFive = data.slice(0, 5);
    firstFive.forEach(user => {
      console.log(user.name);
    });

  } catch (error) {
    console.error("Error:", error.message);
  }
}

getUsers();
