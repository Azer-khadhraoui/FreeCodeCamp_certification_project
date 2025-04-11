document.getElementById("search-button").addEventListener("click", function() {
    const searchInput = document.getElementById("search-input").value.trim().toLowerCase();
    const apiUrl = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searchInput}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Pokémon not found");
            }
            return response.json();
        })
        .then(data => {
            // Clear previous content
            document.getElementById("sprite-container").innerHTML = "";
            document.getElementById("types").innerHTML = "";

            // Display Pokémon data with exact formatting
            document.getElementById("pokemon-name").textContent = data.name.toUpperCase();
            document.getElementById("pokemon-id").textContent = `#${data.id}`;
            document.getElementById("weight").textContent = `Weight: ${data.weight}`;
            document.getElementById("height").textContent = `Height: ${data.height}`;
            // Stats without labels, just raw numbers
            document.getElementById("hp").textContent = data.stats[0].base_stat;
            document.getElementById("attack").textContent = data.stats[1].base_stat;
            document.getElementById("defense").textContent = data.stats[2].base_stat;
            document.getElementById("special-attack").textContent = data.stats[3].base_stat;
            document.getElementById("special-defense").textContent = data.stats[4].base_stat;
            document.getElementById("speed").textContent = data.stats[5].base_stat;

            // Add sprite
            const sprite = document.createElement("img");
            sprite.id = "sprite";
            sprite.src = data.sprites.front_default;
            document.getElementById("sprite-container").appendChild(sprite);

            // Add types
            data.types.forEach(type => {
                const typeElement = document.createElement("span");
                typeElement.textContent = type.type.name.toUpperCase();
                document.getElementById("types").appendChild(typeElement);
            });
        })
        .catch(error => {
            alert("Pokémon not found");
            // Clear display on error
            document.getElementById("pokemon-name").textContent = "";
            document.getElementById("pokemon-id").textContent = "";
            document.getElementById("weight").textContent = "";
            document.getElementById("height").textContent = "";
            document.getElementById("hp").textContent = "";
            document.getElementById("attack").textContent = "";
            document.getElementById("defense").textContent = "";
            document.getElementById("special-attack").textContent = "";
            document.getElementById("special-defense").textContent = "";
            document.getElementById("speed").textContent = "";
            document.getElementById("sprite-container").innerHTML = "";
            document.getElementById("types").innerHTML = "";
        });
});