document.addEventListener("DOMContentLoaded", () => {
  const pageConfig = {
      'component-libraries.html': {
          csvUrl: 'https://michalklimt.github.io/UItootling-experiments/ComponentLibraries.csv',
          title: 'Component Libraries',
          primaryColor: '#FF5733'  // Příklad barvy
      },
      'documentation-tools.html': {
          csvUrl: 'https://michalklimt.github.io/UItootling-experiments/IconLibraries.csv',
          title: 'Documentation Tools',
          primaryColor: '#33FF57'  // Příklad barvy
      },
      'design-system-platforms.html': {
          csvUrl: 'https://michalklimt.github.io/UItootling-experiments/IconLibraries.csv',
          title: 'Design System Platforms',
          primaryColor: '#3357FF'  // Příklad barvy
      },
      'icons-page.html': {
          csvUrl: 'https://michalklimt.github.io/UItootling-experiments/IconLibraries.csv',
          title: 'Icon Libraries',
          primaryColor: '#4B42F5'  // Příklad barvy
      }
  };

  // Získání aktuálního názvu souboru z URL
  const currentPage = window.location.pathname.split('/').pop();

  // Konfigurace pro aktuální stránku
  const currentConfig = pageConfig[currentPage];

  if (currentConfig) {
      // Nastavení titulku a primární barvy
      document.title = currentConfig.title;

      // Načtení a zpracování CSV dat
      fetch(currentConfig.csvUrl)
          .then(response => response.text())
          .then(data => {
              let rows = data.split("\n");
              createTable(rows);
          });
  } else {
      // Můžete přidat výchozí chování nebo zpracování chyb
      console.log("Konfigurace pro tuto stránku nebyla nalezena.");
  }
});

function createTable(rows) {
  if (rows.length === 0) return;

  let table = "<table><thead><tr>";

  // Header row
  let headers = rows[0].split(",");
  headers.forEach((header, index) => {
      if (header.trim() === "Direct Link" || header.trim() === "Category Primary" || header.trim() === "Subcategory") return;
      table += `<th>${header.trim()}</th>`;
  });
  table += "<th class='column-action'>Action</th></tr></thead><tbody>";

  // Data rows
  for (let i = 1; i < rows.length; i++) {
      if (rows[i].trim() === "") continue;
      let columns = rows[i].split(",");
      table += "<tr>";
      columns.forEach((cell, index) => {
          if (headers[index] === "Direct Link") {
              // Skip, as it is handled later for the button
          } else if (headers[index] === "Category Primary" || headers[index] === "Subcategory") {
              // Skip these columns
          } else if (cell.trim().toLowerCase() === "checked") {
              // Display check icon for cells containing "checked"
              table += `<td class="checked-icon"></td>`;
          } else {
              table += `<td>${cell.trim()}</td>`;
          }
      });
      let linkIndex = headers.indexOf("Direct Link");
      let link = columns[linkIndex].trim();
      table += `<td class='column-action'><a href="${link}" class="link-button" target="_blank">Go to page →</a></td>`;
      table += "</tr>";
  }

  table += "</tbody></table>";
  document.querySelector(".table-wrapper").innerHTML = table;
}
