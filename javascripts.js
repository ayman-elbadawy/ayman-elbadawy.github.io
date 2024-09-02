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


//Publications Pop-up

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


//Search bar
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded and parsed');

    const searchInput = document.getElementById('searchInput');
    if (!searchInput) {
        console.error('Search input not found');
        return;
    }

    const publicationItems = document.querySelectorAll('.publication-item');
    console.log(`Found ${publicationItems.length} publication items`);

    searchInput.addEventListener('input', function () {
        const query = searchInput.value.toLowerCase().trim();
        console.log('Typing: ', query);

        publicationItems.forEach(function (item) {
            const titleElement = item.querySelector('.publication-title');
            const authorsElement = item.querySelector('.publication-authors');

            if (titleElement && authorsElement) {
                const title = titleElement.textContent.toLowerCase();
                const authors = authorsElement.textContent.toLowerCase();

                const matchesQuery = title.includes(query) || authors.includes(query);
                item.style.display = matchesQuery ? 'flex' : 'none'; // Use 'flex' to override d-flex
                console.log(`Publication: ${title} - ${matchesQuery ? 'Visible' : 'Hidden'}`);
            } else {
                console.error('Title or authors element not found in publication item.');
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var carousel = document.querySelector('#carouselContent');
    var videos = carousel.querySelectorAll('video');
    
    // Pause the carousel when a video starts playing
    function pauseCarousel() {
        $(carousel).carousel('pause');
    }

    // Resume the carousel when the video ends
    function resumeCarousel() {
        $(carousel).carousel('cycle');
    }

    // Play video when it becomes visible
    function handleVideoSlide(event) {
        var video = event.relatedTarget.querySelector('video');
        if (video) {
            video.currentTime = 0; // Restart video
            video.play();
            pauseCarousel();
            video.onended = function () {
                resumeCarousel();
            };
        } else {
            // Pause the video if it is not on the current slide
            videos.forEach(v => v.pause());
        }
    }

    // Event listener for when the carousel slide changes
    $(carousel).on('slide.bs.carousel', handleVideoSlide);

    // Event listener to ensure video plays correctly when navigating back to the slide
    $(carousel).on('slide.bs.carousel', function () {
        var activeSlide = $(carousel).find('.carousel-item-active');
        var video = activeSlide.find('video').get(0);
        if (video) {
            video.currentTime = 0; // Restart video if on active slide
            video.play();
            pauseCarousel();
            video.onended = function () {
                resumeCarousel();
            };
        }
    });

    // Initial setup for carousel pause when video is present
    videos.forEach(video => {
        video.addEventListener('play', pauseCarousel);
        video.addEventListener('ended', resumeCarousel);
    });
});

















