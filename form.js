const form = document.getElementById("form");
      const occupationSelect = document.getElementById("occupation");
      const stateSelect = document.getElementById("state");

      const fetchOccupationsAndStates = async () => {
        const response = await fetch("https://frontend-take-home.fetchrewards.com/form");
        const data = await response.json();

        data.occupations.forEach((occupation) => {
          const option = document.createElement("option");
          option.value = option.textContent = occupation;
          occupationSelect.appendChild(option);
        });

        data.states.forEach((state) => {
          const option = document.createElement("option");
          option.value = state.abbreviation;
          option.textContent = state.name;
          stateSelect.appendChild(option);
        });
      };

      const submitForm = async (event) => {
        event.preventDefault();

        const fullName = document.getElementById("fullName").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const occupation = occupationSelect.value;
        const state = stateSelect.value;

        const response = await fetch("https://frontend-take-home.fetchrewards.com/form", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: fullName,
            email,
            password,
            occupation,
            state,
          }),
        });

        if (response.status === 201) {
          const createdUser = await response.json();
          console.log("User created:", createdUser);
        } else {
          console.error("User creation failed");
        }
      };

      form.addEventListener("submit", submitForm);
      fetchOccupationsAndStates();