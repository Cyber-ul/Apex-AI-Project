# 🤖 AI Apex

### ✨ Project Overview

**AI Apex** is a project focused on demonstrating the capabilities of fundamental cryptographic and text processing algorithms through a modern web interface.

The goal is to create a secure, user-friendly tool that visualizes complex logic. While future versions are planned to integrate a dedicated Python backend for advanced tasks, the current version is deployed as a high-speed, client-side application.

### 🚀 Current Live Application: Affine Cipher Tool

The current public version of AI Apex implements a full-featured **Affine Cipher Tool**. It allows users to encrypt and decrypt text instantly in their browser.

You can interact with the live application here:

https://cyber-ul.github.io/Apex-AI-Project/

---

### 💡 How to Use the Cipher Tool

1.  **Input Text:** Enter the plaintext or ciphertext message into the main text area.
2.  **Define Keys:** Input numerical values for the two core cipher keys, **$a$** (multiplicative) and **$b$** (additive).
3.  **Process:** Click either the **Encrypt** or **Decrypt** button to see the transformation result immediately.

#### ⚠️ Essential Key Constraint

For the cipher to be mathematically reversible (i.e., for decryption to work correctly), **Key $a$ MUST be coprime with 26**. (The greatest common divisor of $a$ and $26$ must be 1).

**Valid examples for Key $a$ are:** 1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25.

---

### 💻 Technology Stack

| Component | Technology | Role |
| :--- | :--- | :--- |
| **Frontend/Logic** | **JavaScript** | Handles the core cipher algorithms (modular arithmetic, inverse calculation) and manages all user interaction. |
| **Structure** | **HTML5** | Provides the semantic structure and layout for the application interface. |
| **Styling** | **CSS3** | Ensures a clean, modern, and responsive user experience. |
| **Deployment** | **GitHub Pages** | Used for fast, reliable, and free hosting of the static web application. |

---

### ➡️ Future Development

Planned enhancements for future iterations of AI Apex include:

* **Python Integration:** Adding a dedicated Python backend (using Flask/Django) to handle advanced AI/ML algorithms that cannot run client-side.
* **Expanded Algorithms:** Implementation of more complex ciphers (e.g., Vigenere, RSA) and basic data science models.
* **Data Visualization:** Graphical display of key frequencies and cipher effectiveness.
