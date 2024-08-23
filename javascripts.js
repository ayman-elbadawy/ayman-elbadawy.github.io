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

//Loading Spinner
window.addEventListener("load", function() {
    document.getElementById("spinner").style.display = "none";
});


document.addEventListener("DOMContentLoaded", function() {
    // Handle citation button click
    document.querySelectorAll('.cite-button').forEach(button => {
        button.addEventListener('click', function() {
            console.log("CITE button clicked"); // Debugging line

            // Retrieve citation data
            const title = this.getAttribute('data-title');
            const bibtexUrl = this.getAttribute('data-bibtex-url');
            const plainTextUrl = this.getAttribute('data-plaintext-url');

            // Fetch BibTeX content
            fetch(bibtexUrl)
                .then(response => response.text())
                .then(bibtex => {
                    console.log("BibTeX fetched"); // Debugging line
                    const citationContent = `
                        <h5>${title}</h5>
                        <textarea rows="10" style="width: 100%;" readonly>${bibtex}</textarea>
                    `;
                    document.getElementById('citationContent').innerHTML = citationContent;
                    document.getElementById('downloadBibtex').style.display = 'block';
                    document.getElementById('downloadPlainText').style.display = 'none';

                    // Set citation format buttons
                    document.getElementById('bibtexButton').onclick = function() {
                        document.getElementById('citationContent').innerHTML = `
                            <h5>${title}</h5>
                            <textarea rows="10" style="width: 100%;" readonly>${bibtex}</textarea>
                        `;
                        document.getElementById('downloadBibtex').style.display = 'block';
                        document.getElementById('downloadPlainText').style.display = 'none';
                    };

                    document.getElementById('plainTextButton').onclick = function() {
                        fetch(plainTextUrl)
                            .then(response => response.text())
                            .then(plainText => {
                                document.getElementById('citationContent').innerHTML = `
                                    <h5>${title}</h5>
                                    <textarea rows="10" style="width: 100%;" readonly>${plainText}</textarea>
                                `;
                                document.getElementById('downloadBibtex').style.display = 'none';
                                document.getElementById('downloadPlainText').style.display = 'block';
                            })
                            .catch(error => console.error("Error fetching plain text:", error));
                    };

                    // Show modal
                    $('#citationModal').modal('show');
                })
                .catch(error => console.error("Error fetching BibTeX:", error));
        });
    });

    // Handle download button clicks
    document.getElementById('downloadBibtex').addEventListener('click', function() {
        const bibtexContent = document.querySelector('#citationContent textarea').value;
        const blob = new Blob([bibtexContent], {type: 'text/plain'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'citation.bib';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });

    document.getElementById('downloadPlainText').addEventListener('click', function() {
        const plainTextContent = document.querySelector('#citationContent textarea').value;
        const blob = new Blob([plainTextContent], {type: 'text/plain'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'citation.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });
});







