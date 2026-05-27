const applicationForm = document.getElementById("applicationForm");
const shareLinkInput = document.getElementById("shareLink");
const copyLinkButton = document.getElementById("copyLink");
const statusMessage = document.getElementById("statusMessage");

const emailServiceId = "service_j2ztdaw";
const emailTemplateId = "template_k6dan3n";
const emailPublicKey = "Cd6jtl0ZPyZ6oplyG";

function updateShareLink() {
  const url = window.location.href;
  shareLinkInput.value = url;
}

function setStatus(text, type) {
  statusMessage.textContent = text;
  statusMessage.className = `status ${type}`;
}

copyLinkButton.addEventListener("click", () => {
  navigator.clipboard.writeText(shareLinkInput.value)
    .then(() => {
      copyLinkButton.textContent = "Lien copié !";
      setTimeout(() => {
        copyLinkButton.textContent = "Copier le lien";
      }, 2000);
    })
    .catch(() => {
      alert("Impossible de copier le lien. Copie-le manuellement.");
    });
});

emailjs.init(emailPublicKey);

if (emailServiceId.startsWith("YOUR_") || emailTemplateId.startsWith("YOUR_") || emailPublicKey.startsWith("YOUR_")) {
  setStatus("Configuration EmailJS manquante : remplace les placeholders dans script.js.", "error");
}

applicationForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const age = document.getElementById("age").value;
  const minecraftPseudo = document.getElementById("minecraftPseudo").value.trim();
  const discord = document.getElementById("discord").value.trim();
  const niveau = document.getElementById("niveau").value;
  const dateDebut = document.getElementById("dateDebut").value;
  const tempsJour = document.getElementById("tempsJour").value.trim();
  const tempsSemaine = document.getElementById("tempsSemaine").value.trim();
  const interetServeur = document.getElementById("interetServeur").value.trim();
  const dejaServeurs = document.getElementById("dejaServeurs").value;
  const typeServeur = document.getElementById("typeServeur").value;
  const message = document.getElementById("message").value.trim();

  setStatus("Envoi de la candidature en cours...", "info");

  const templateParams = {
    age,
    minecraft_pseudo: minecraftPseudo,
    discord,
    niveau,
    date_debut: dateDebut,
    temps_jour: tempsJour,
    temps_semaine: tempsSemaine,
    interet_serveur: interetServeur,
    deja_serveurs: dejaServeurs,
    type_serveur: typeServeur,
    message,
  };

  try {
    await emailjs.send(emailServiceId, emailTemplateId, templateParams);
    setStatus("Candidature envoyée avec succès !", "success");
    applicationForm.reset();
    updateShareLink();
  } catch (error) {
    console.error("Erreur EmailJS:", error);
    console.log("Service ID:", emailServiceId);
    console.log("Template ID:", emailTemplateId);
    console.log("Public Key:", emailPublicKey);
    setStatus(`Erreur : ${error.text || error.message || "Vérifie la configuration EmailJS"}`, "error");
  }
});

updateShareLink();
window.addEventListener("popstate", updateShareLink);
window.addEventListener("resize", updateShareLink);
