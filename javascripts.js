// Show or hide the button when scrolling
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    const topButton = document.getElementById("topBtn");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        topButton.style.display = "block";
    } else {
        topButton.style.display = "none";
    }
}

// Scroll to the top when the button is clicked
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
}

 
// Hover for tabs
document.addEventListener("DOMContentLoaded", function() {
    // Select all tab links
    const tabs = document.querySelectorAll('.nav-link');

    // Add event listeners for mouseenter and mouseleave
    tabs.forEach(tab => {
        tab.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.3)';
            this.style.transform = 'scale(1.08)';
        });

        tab.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
            this.style.transform = 'scale(1)';
        });
    });
});


// Hover for buttons
document.addEventListener("DOMContentLoaded", function() {
    // Select all buttons within the publication-links div
    const buttons = document.querySelectorAll('.publication-links .btn');

    // Add event listeners for mouseenter and mouseleave
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.3)';
            this.style.transform = 'scale(1.2)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
            this.style.transform = 'scale(1)';
        });
    });
});


//Loading Spinner
window.addEventListener("load", function() {
    document.getElementById("spinner").style.display = "none";
});


document.addEventListener("DOMContentLoaded", function() {
    let currentBibtexContent = "";
    let currentPlainTextContent = "";
    let currentBibtexUrl = "";
    let currentPlainTextUrl = "";

    // Handle citation button click
    document.querySelectorAll('.cite-button').forEach(button => {
        button.addEventListener('click', function() {
            // Retrieve citation data
            const title = this.getAttribute('data-title');
            const bibtexUrl = this.getAttribute('data-bibtex-url');
            const plainTextUrl = this.getAttribute('data-plaintext-url');

            currentBibtexUrl = bibtexUrl;
            currentPlainTextUrl = plainTextUrl;

            // Fetch BibTeX content and update modal
            fetch(bibtexUrl)
                .then(response => response.text())
                .then(bibtex => {
                    currentBibtexContent = bibtex;  // Store BibTeX content
                    const citationContent = `
                        <h5>${title}</h5>
                        <textarea rows="10" style="width: 100%;" readonly>${bibtex}</textarea>
                    `;
                    document.getElementById('citationContent').innerHTML = citationContent;
                    document.getElementById('downloadBibtex').style.display = 'block';
                    document.getElementById('downloadPlainText').style.display = 'none';
                })
                .catch(error => {
                    console.error("Error fetching BibTeX:", error);
                });

            // Fetch Plain Text content and store it for later use
            fetch(plainTextUrl)
                .then(response => response.text())
                .then(plainText => {
                    currentPlainTextContent = plainText;  // Store Plain Text content
                    document.getElementById('plainTextButton').onclick = function() {
                        document.getElementById('citationContent').innerHTML = `
                            <h5>${title}</h5>
                            <textarea rows="10" style="width: 100%;" readonly>${plainText}</textarea>
                        `;
                        document.getElementById('downloadBibtex').style.display = 'none';
                        document.getElementById('downloadPlainText').style.display = 'block';
                    };
                })
                .catch(error => {
                    console.error("Error fetching Plain Text:", error);
                });

            // Update the BibTeX button functionality
            document.getElementById('bibtexButton').onclick = function() {
                document.getElementById('citationContent').innerHTML = `
                    <h5>${title}</h5>
                    <textarea rows="10" style="width: 100%;" readonly>${currentBibtexContent}</textarea>
                `;
                document.getElementById('downloadBibtex').style.display = 'block';
                document.getElementById('downloadPlainText').style.display = 'none';
            };

            // Show modal
            $('#citationModal').modal('show');
        });
    });

    // Handle download button clicks
    document.getElementById('downloadBibtex').addEventListener('click', function() {
        const a = document.createElement('a');
        a.href = currentBibtexUrl;
        a.download = currentBibtexUrl.split('/').pop();
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });

    document.getElementById('downloadPlainText').addEventListener('click', function() {
        const a = document.createElement('a');
        a.href = currentPlainTextUrl;
        a.download = currentPlainTextUrl.split('/').pop();
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });
});

document.getElementById('searchInput').addEventListener('keyup', function() {
    console.log('Keyup event detected');
    const query = this.value.toLowerCase();
    const publicationItems = document.querySelectorAll('.publication-item');

    publicationItems.forEach(function(item) {
        const title = item.querySelector('.publication-title').textContent.toLowerCase();
        const authors = item.querySelector('.publication-authors').textContent.toLowerCase();

        if (title.includes(query) || authors.includes(query)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
});











