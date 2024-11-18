import { render, screen } from "@testing-library/react";
import { FormError } from "./FormError";

describe("FormError component", () => {
  it("display error msg if not empty", () => {
    const errorMessage = "il y a une erreur";

    render(<FormError error={errorMessage} />);

    const errorElement = screen.getByText(errorMessage);
    expect(errorElement).toBeInTheDocument();
  });

  it("renders nothing when error prop is empty", () => {
    const { container } = render(<FormError error={null} />);

    expect(container).toBeEmptyDOMElement(); // Vérifie que rien n'est rendu
  });
});
