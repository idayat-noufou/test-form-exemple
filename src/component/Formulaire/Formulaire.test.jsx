// Formulaire.test.jsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Formulaire } from "./Formulaire";
import toast from "react-hot-toast";
import "whatwg-fetch";
import { vi } from "vitest";

vi.mock("react-hot-toast", () => ({
  default: {
    error: vi.fn(),
    success: vi.fn(),
  },
  error: vi.fn(),
  success: vi.fn(),
}));

describe("Formulaire component", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("display all with submit button disabled", () => {
    render(<Formulaire />);
    const inputs = screen.getAllByRole("textbox");
    const dateInput = screen.getByLabelText(/date de naissance/i);
    const submitButton = screen.getByRole("button", { name: /sauvegarder/i });

    expect(inputs).toHaveLength(5);
    expect(dateInput).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it("enable submit button", () => {
    render(<Formulaire />);

    fireEvent.input(screen.getByTestId("nom"), { target: { value: "Noufou" } });
    fireEvent.input(screen.getByTestId("prenom"), { target: { value: "Idayat" } });
    fireEvent.input(screen.getByTestId("email"), { target: { value: "nouf.ida@example.com" } });
    fireEvent.input(screen.getByTestId("date"), { target: { value: "2000-01-01" } });
    fireEvent.input(screen.getByTestId("ville"), { target: { value: "Paris" } });
    fireEvent.input(screen.getByTestId("code"), { target: { value: "75001" } });

    const submitButton = screen.getByRole("button", { name: /sauvegarder/i });
    expect(submitButton).toBeEnabled();
  });

  it("saves form and shows success message", async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true });
    render(<Formulaire />);

    fireEvent.input(screen.getByTestId("nom"), { target: { value: "Noufou" } });
    fireEvent.input(screen.getByTestId("prenom"), { target: { value: "Idayat" } });
    fireEvent.input(screen.getByTestId("email"), { target: { value: "nouf.ida@example.com" } });
    fireEvent.input(screen.getByTestId("date"), { target: { value: "2000-01-01" } });
    fireEvent.input(screen.getByTestId("ville"), { target: { value: "Paris" } });
    fireEvent.input(screen.getByTestId("code"), { target: { value: "75001" } });

    fireEvent.click(screen.getByRole("button", { name: /sauvegarder/i }));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Les informations ont bien été enregistrées");
    });
  });

  it("shows saving error", async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false });
    render(<Formulaire />);

    fireEvent.input(screen.getByTestId("nom"), { target: { value: "Noufou" } });
    fireEvent.input(screen.getByTestId("prenom"), { target: { value: "Idayat" } });
    fireEvent.input(screen.getByTestId("email"), { target: { value: "nouf.ida@example.com" } });
    fireEvent.input(screen.getByTestId("date"), { target: { value: "2000-01-01" } });
    fireEvent.input(screen.getByTestId("ville"), { target: { value: "Paris" } });
    fireEvent.input(screen.getByTestId("code"), { target: { value: "75001" } });

    fireEvent.click(screen.getByRole("button", { name: /sauvegarder/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Erreur lors de l'enregistrement de l'utilisateur");
    });
  });

  it("shows network error", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Network Error"));
    render(<Formulaire />);

    fireEvent.input(screen.getByTestId("nom"), { target: { value: "Noufou" } });
    fireEvent.input(screen.getByTestId("prenom"), { target: { value: "Idayat" } });
    fireEvent.input(screen.getByTestId("email"), { target: { value: "nouf.ida@example.com" } });
    fireEvent.input(screen.getByTestId("date"), { target: { value: "2000-01-01" } });
    fireEvent.input(screen.getByTestId("ville"), { target: { value: "Paris" } });
    fireEvent.input(screen.getByTestId("code"), { target: { value: "75001" } });

    fireEvent.click(screen.getByRole("button", { name: /sauvegarder/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Erreur réseau, veuillez réessayer");
    });
  });

  it("shows formulaire errors", async () => {
    render(<Formulaire />);

    fireEvent.input(screen.getByTestId("nom"), { target: { value: "Invalid!" } });
    fireEvent.input(screen.getByTestId("prenom"), { target: { value: "Invalid!" } });
    fireEvent.input(screen.getByTestId("email"), { target: { value: "example@example" } });
    fireEvent.input(screen.getByTestId("date"), { target: { value: "2000-01-01" } });
    fireEvent.input(screen.getByTestId("ville"), { target: { value: "Paris?" } });
    fireEvent.input(screen.getByTestId("code"), { target: { value: "75001l" } });

    const submitButton = screen.getByRole("button", { name: /sauvegarder/i });
    expect(submitButton).toBeEnabled();
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Erreur, veuillez ressaisir les éléments");
    });
  });
});
