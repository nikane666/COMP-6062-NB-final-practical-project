// Create a new Vue application
const app = Vue.createApp({

  data() {
      return {
          // Data for the random fact section
          randomFact: '',

          // Data for the weather section
          weather: {
              city: 'London, Ontario', // Default city
              temperature: 'N/A',      // Placeholder for temperature
              wind: 'N/A',             // Placeholder for wind speed
              description: 'N/A'       // Placeholder for weather description
          },
          cityInput: '', // Used to store user input for the city

          // Data for the dictionary section
          dictionary: {
              word: 'N/A',            // Placeholder for the word
              phonetic: 'N/A',        // Placeholder for the phonetic pronunciation
              partOfSpeech: 'N/A',    // Placeholder for the part of speech
              definition: 'N/A'       // Placeholder for the definition
          },
          wordInput: '' 
      };
  },
  
  created() {
      // Automatically fetch a random fact when the app loads
      this.getRandomFact();

      // Automatically fetch weather for the default city (London, Ontario)
      this.getWeather('London Ontario');
  },
  
  methods: {
      async getRandomFact() {
          try {
              // Fetch data from the random fact API
              const response = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en');
              const data = await response.json();

              
              this.randomFact = data.text;
          } catch (error) {
              
              console.error(error);
              this.randomFact = 'Unable to load fact';
          }
      },
      // Fetch weather information for a given city
      async getWeather(city) {
          try {
              // Encode the city name for use in the API request
              const encodedCity = encodeURIComponent(city);

              // Fetch weather data from the weather API
              const response = await fetch(`https://goweather.herokuapp.com/weather/${encodedCity}`);
              const data = await response.json();

              
              if (data.temperature && data.wind && data.description) {
                  
                  this.weather = {
                      city: city,
                      temperature: data.temperature || 'N/A',
                      wind: data.wind || 'N/A',
                      description: data.description || 'N/A'
                  };
              } else {
                  
                  this.weather = {
                      city: city,
                      temperature: 'N/A',
                      wind: 'N/A',
                      description: 'N/A'
                  };
              }
          } catch (error) {
              
              console.error(error);
              this.weather = {
                  city: 'London, Ontario',
                  temperature: 'N/A',
                  wind: 'N/A',
                  description: 'N/A'
              };
          }
      },
      // Fetch the definition of a word from an API
      async getDefinition() {
          // Do nothing if the wordInput is empty
          if (!this.wordInput) return;

          try {
              // Fetch the definition from the dictionary API
              const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${this.wordInput.toLowerCase()}`);
              const data = await response.json();

              
              if (data.length > 0) {
                  const wordData = data[0];

                  
                  this.dictionary = {
                      word: wordData.word || 'N/A',
                      phonetic: wordData.phonetic || 'N/A',
                      partOfSpeech: wordData.meanings[0]?.partOfSpeech || 'N/A',
                      definition: wordData.meanings[0]?.definitions[0]?.definition || 'N/A'
                  };
              } else {
                  
                  this.dictionary = {
                      word: 'N/A',
                      phonetic: 'N/A',
                      partOfSpeech: 'N/A',
                      definition: 'No definition found for the given word.'
                  };
              }
          } catch (error) {
              
              console.error(error);
              this.dictionary = {
                  word: 'N/A',
                  phonetic: 'N/A',
                  partOfSpeech: 'N/A',
                  definition: 'Error fetching definition'
              };
          }
      }
  }
});

// Mount the Vue app to the DOM element with the id 'app'
app.mount('#app');
