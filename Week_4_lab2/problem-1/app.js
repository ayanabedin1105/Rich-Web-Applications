var entryIndex = 1; // Initialize the entry index
        var ascending = true; // Initial sort order is ascending

        function validateAndAddEntry() {
            // Clear previous error messages
            document.getElementById("nameError").textContent = "";
            document.getElementById("mobileError").textContent = "";
            document.getElementById("emailError").textContent = "";

            var name = document.getElementById("name").value;
            var mobile = document.getElementById("mobile").value;
            var email = document.getElementById("email").value;

            // Name validation
            if (!/^[A-Za-z\s]{1,20}$/.test(name)) {
                document.getElementById("nameError").textContent = "Name should contain only alphabets and space, up to 20 characters.";
                return;
            }

            // Mobile validation
            if (!/^\d{10}$/.test(mobile)) {
                document.getElementById("mobileError").textContent = "Mobile should contain 10 digits.";
                return;
            }

            // Email validation (basic pattern, you can use a more robust one)
            if (email && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
                document.getElementById("emailError").textContent = "Enter a valid email address.";
                return;
            }

            // Add the entry to the table
            var table = document.getElementById("directoryTable").getElementsByTagName('tbody')[0];
            var row = table.insertRow();
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            cell1.innerHTML = name;
            cell2.innerHTML = mobile;
            cell3.innerHTML = email;

            // Clear the input fields
            document.getElementById("name").value = "";
            document.getElementById("mobile").value = "";
            document.getElementById("email").value = "";

            // Increment the entry index for the next entry
            entryIndex++;
        }

        function sortTable(column) {
            var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
            table = document.getElementById("directoryTable");
            switching = true;
            dir = ascending ? "asc" : "desc"; // Toggle sorting order

            while (switching) {
                switching = false;
                rows = table.rows;
                for (i = 1; i < (rows.length - 1); i++) {
                    shouldSwitch = false;
                    x = rows[i].getElementsByTagName("td")[column].textContent.toLowerCase();
                    y = rows[i + 1].getElementsByTagName("td")[column].textContent.toLowerCase();

                    if (dir == "asc") {
                        if (x > y) {
                            shouldSwitch = true;
                            break;
                        }
                    } else if (dir == "desc") {
                        if (x < y) {
                            shouldSwitch = true;
                            break;
                        }
                    }
                }
                if (shouldSwitch) {
                    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                    switching = true;
                    switchcount++;
                } else {
                    if (switchcount == 0 && dir == "asc") {
                        dir = "desc";
                        switching = true;
                    }
                }
            }
            // Toggle sorting order for the next click
            ascending = !ascending;
        }

        function searchMobile() {
            var input, filter, table, tbody, tr, td, i, txtValue, noResult;
            input = document.getElementById("searchBar");
            filter = input.value;
            table = document.getElementById("directoryTable");
            tbody = table.getElementsByTagName("tbody")[0];
            tr = tbody.getElementsByTagName("tr");
            noResult = document.getElementById("noResult");

            for (i = 0; i < tr.length; i++) {
                td = tr[i].getElementsByTagName("td")[1]; // The second column is Mobile
                if (td) {
                    txtValue = td.textContent || td.innerText;
                    if (txtValue.indexOf(filter) > -1) {
                        tr[i].style.display = "";
                    } else {
                        tr[i].style.display = "none";
                    }
                }
            }

            // Display or hide the "No matching result" message
            noResult.style.display = (tbody.querySelectorAll("tr[style='display: none;']").length === tr.length) ? "block" : "none";
        }