async function fetchDate() {
    const response = await fetch(
      "http://worldtimeapi.org/api/timezone/America/New_York",
    );
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  }
  
  const promise = fetchDate();
  promise
    .then((data) => {
      date = new Date(data.datetime)
      console.log(date.toLocaleDateString())
    })
    .catch((error) => {
      console.error(`Could not get date: ${error}`);
    });
  