  
 
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

function removeActive() { navLinks.forEach(link => link.classList.remove("active")); }

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const nav = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (entry.isIntersecting && nav) {
        removeActive();
        nav.classList.add("active");
        entry.target.classList.add("visible"); 
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(section => observer.observe(section));

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    removeActive();
    link.classList.add("active");
  });
});


const typedText = document.getElementById("typed-text");
const texts = ["Full-Stack Developer", "DSA Enthusiast", "MERN Stack Developer"];
let t = 0, c = 0, del = false;

function type() {
  typedText.textContent = texts[t].slice(0, c);
  if (!del) c++; else c--;
  if (c === texts[t].length + 1) del = true;
  if (c === 0 && del) { del = false; t = (t + 1) % texts.length; }
  setTimeout(type, del ? 60 : 100);
}
type();
