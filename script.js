// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  // Loading animation
  const loading = document.createElement("div")
  loading.className = "loading"
  const spinner = document.createElement("div")
  spinner.className = "loading-spinner"
  loading.appendChild(spinner)
  document.body.appendChild(loading)

  // Hide loading animation after 1.5 seconds
  setTimeout(() => {
    loading.classList.add("hidden")
    setTimeout(() => {
      loading.remove()
    }, 500)
  }, 1500)

  // Theme toggle functionality
  const themeToggle = document.querySelector(".theme-toggle")
  const body = document.body

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "dark") {
    body.classList.add("dark-theme")
  }

  // Toggle theme when clicked
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-theme")

    // Save theme preference
    if (body.classList.contains("dark-theme")) {
      localStorage.setItem("theme", "dark")
    } else {
      localStorage.setItem("theme", "light")
    }
  })

  // Typing animation
  const typingElement = document.querySelector(".typing")
  const phrases = [
    "Creating smart, beautiful, and efficient digital solutions.",
    "Building websites that make an impact.",
    "Exploring AI and its possibilities.",
    "Turning ideas into digital reality.",
  ]

  let phraseIndex = 0
  let charIndex = 0
  let isDeleting = false
  let typingSpeed = 100

  function typeText() {
    const currentPhrase = phrases[phraseIndex]

    if (isDeleting) {
      // Deleting text
      typingElement.textContent = currentPhrase.substring(0, charIndex - 1)
      charIndex--
      typingSpeed = 50
    } else {
      // Typing text
      typingElement.textContent = currentPhrase.substring(0, charIndex + 1)
      charIndex++
      typingSpeed = 100
    }

    // If finished typing
    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true
      typingSpeed = 1500 // Pause at the end
    }
    // If finished deleting
    else if (isDeleting && charIndex === 0) {
      isDeleting = false
      phraseIndex = (phraseIndex + 1) % phrases.length
      typingSpeed = 500 // Pause before typing next phrase
    }

    setTimeout(typeText, typingSpeed)
  }

  // Start typing animation
  setTimeout(typeText, 2000)

  // Back to top button
  const backToTopButton = document.querySelector(".back-to-top")

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add("visible")
    } else {
      backToTopButton.classList.remove("visible")
    }
  })

  // Animate skill bars when they come into view
  const skillBars = document.querySelectorAll(".skill-progress")
  const animateElements = document.querySelectorAll(".fade-in")

  // Intersection Observer for animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
        }
      })
    },
    { threshold: 0.1 },
  )

  // Observe skill bars
  skillBars.forEach((bar) => {
    observer.observe(bar)
  })

  // Add fade-in class to elements
  document
    .querySelectorAll(".project-card, .education-card, .certification-card, .language-card")
    .forEach((element) => {
      element.classList.add("fade-in")
      observer.observe(element)
    })

  // Form submission
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Get form values
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        // Prepare form data
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('message', message);

        try {
            // Replace this URL with your actual FormSubmit or backend endpoint
            const response = await fetch('https://formsubmit.co/ajax/14d7531c59650404d07769c57903fb3c', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
                body: formData
            });

            if (response.ok) {
                alert(`Thank you, ${name}! Your message has been received. We'll get back to you soon.`);

                // Reset form
                contactForm.reset();
            } else {
                alert('Something went wrong. Please try again later.');
            }
        } catch (error) {
            alert('Error submitting form. Please check your connection.');
            console.error(error);
          }

          //download button functionality, loader,and sweetalert2 popup
          const downloadButton = document.getElementById('downloadCvButton');

        downloadButton.addEventListener('click', function (e) {
            e.preventDefault();
        
            const originalContent = downloadButton.innerHTML;
            downloadButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
            downloadButton.disabled = true;
        
            fetch('Kyle Bradley Oluoch.cv.pdf') // <-- Update with correct CV file path
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.blob();
                })
                .then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'KyleBradleyOluoch_CV.pdf';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
        
                    // Reset button
                    downloadButton.innerHTML = originalContent;
                    downloadButton.disabled = false;
        
                    // Show SweetAlert2 popup
                    Swal.fire({
                        icon: 'success',
                        title: 'Download Complete!',
                        text: 'Your CV has been downloaded successfully ✅',
                        showConfirmButton: false,
                        timer: 2500
                    });
                })
                .catch(error => {
                    console.error('Download error:', error);
                    downloadButton.innerHTML = 'Failed to Download';
                    setTimeout(() => {
                        downloadButton.innerHTML = originalContent;
                        downloadButton.disabled = false;
                    }, 2000);
        
                    // Error SweetAlert2 popup
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops!',
                        text: 'Something went wrong while downloading.',
                    });
                });
        });
        
    });
}

    })
  

