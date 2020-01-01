import React from "react";

export default function Header() {
  return (
    <header class="inner">
      <h2>
        <a href="/">
          <i class="fas fa-code"></i>
          CodeGig
        </a>
      </h2>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/">All Restaruants</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
