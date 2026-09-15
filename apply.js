const form = document.getElementById("applicationForm");

if (form) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form).entries());
    const ref = "MIS-" + Math.floor(100000 + Math.random() * 900000);

    const submission = {
      ...data,
      reference: ref,
      _subject: `New Misokuhle loan application - ${ref}`,
      _replyto: data.email,
      _template: "table"
    };

    const button = form.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    button.disabled = true;
    button.textContent = "Sending application...";

    try {
      const response = await fetch("https://formsubmit.co/ajax/Misokuhlefinancials@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(submission)
      });

      const result = await response.json();

      if (!response.ok || result.success === false) {
        throw new Error("The application could not be sent.");
      }

      document.getElementById("ref").textContent = ref;

      const msg = `Hi Misokuhle Financial Services. I submitted an online loan application. My reference is ${ref}. Please advise me on the next steps and required documentation.`;
      document.getElementById("wa").href = "https://wa.me/27814357440?text=" + encodeURIComponent(msg);

      form.style.display = "none";
      document.getElementById("submitted").style.display = "block";
    } catch (error) {
      console.error(error);
      button.disabled = false;
      button.textContent = originalText;
      alert("We could not send your application right now. Please try again or contact Misokuhle Financial Services on WhatsApp: 081 435 7440.");
    }
  });
}
