// Function to fetch quiz data from the API endpoint
export const fetchQuizData = async () => {
  try {
    // Fetch data from the API, using the proxy defined in package.json
    const response = await fetch('/Uw5CrX'); // Use relative path since the proxy is set

    // Check if the response is ok (status code 200-299)
    if (!response.ok) {
      throw new Error('Failed to fetch quiz data: ' + response.statusText);
    }

    // Parse the JSON data from the response
    const data = await response.json();

    // Log the data for debugging
    console.log('Fetched Data:', data);

    // Extract questions from the response and check if it's an array
    if (data && Array.isArray(data.questions)) {
      return data.questions; // Return questions array to be used in QuizPage
    } else {
      throw new Error('Invalid data format: Expected an object with questions array.');
    }
  } catch (error) {
    // Log the error and return null
    console.error('Error fetching quiz data:', error);
    return null; // Return null to indicate error
  }
};
