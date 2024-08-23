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
            // Retrieve citation data
            const title = this.getAttribute('data-title');
            const bibtex = this.getAttribute('data-bibtex');
            const plainText = this.getAttribute('data-plaintext');

            // Update modal content to default to BibTeX
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
                document.getElementById('citationContent').innerHTML = `
                    <h5>${title}</h5>
                    <textarea rows="10" style="width: 100%;" readonly>${plainText}</textarea>
                `;
                document.getElementById('downloadBibtex').style.display = 'none';
                document.getElementById('downloadPlainText').style.display = 'block';
            };

            // Show modal
            $('#citationModal').modal('show');
        });
    });

    // Handle download button clicks
    document.getElementById('downloadBibtex').addEventListener('click', function() {
        const bibtex = document.querySelector('.cite-button').getAttribute('data-bibtex');
        const blob = new Blob([bibtex], {type: 'text/plain'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'citation.bib';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });

    document.getElementById('downloadPlainText').addEventListener('click', function() {
        const plainText = document.querySelector('.cite-button').getAttribute('data-plaintext');
        const blob = new Blob([plainText], {type: 'text/plain'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'citation.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });
});





