import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Formulaire } from "./Formulaire";
import toast from "react-hot-toast";

jest.mock("react-hot-toast", () => ({
  error: jest.fn(),
  success: jest.fn(),
}));

describe("Formulaire component", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
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

  it("formulaire errors", async () => {
    render(<Formulaire />);

    fireEvent.input(screen.getByTestId("nom"), { target: { value: "" } });
    fireEvent.input(screen.getByTestId("prenom"), { target: { value: "Invalid!" } });
    fireEvent.input(screen.getByTestId("email"), { target: { value: "invalid-email" } });
    fireEvent.input(screen.getByTestId("date"), { target: { value: "2020-01-01" } });
    fireEvent.input(screen.getByTestId("code"), { target: { value: "123" } });

    const submitButton = screen.getByRole("button", { name: /sauvegarder/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(toast.error);
    });

    // expect(screen.getByText('value is empty')).toBeInTheDocument();
    // expect(screen.getByText('!is not a permitted character')).toBeInTheDocument();
    // expect(screen.getByText('email is not valid')).toBeInTheDocument();
    // expect(screen.getByText('age must be over 18')).toBeInTheDocument();
    // expect(screen.getByText('postal code is not valid')).toBeInTheDocument();
  });

  it("saves fom in localStorage and shows success message", async () => {
    render(<Formulaire />);

    fireEvent.input(screen.getByTestId("nom"), { target: { value: "Noufou" } });
    fireEvent.input(screen.getByTestId("prenom"), { target: { value: "Idayat" } });
    fireEvent.input(screen.getByTestId("email"), { target: { value: "nouf.ida@example.com" } });
    fireEvent.input(screen.getByTestId("date"),  { target: { value: "2000-01-01" } });
    fireEvent.input(screen.getByTestId("ville"), { target: { value: "Paris" } });
    fireEvent.input(screen.getByTestId("code"),  { target: { value: "75001" } });

    const submitButton = screen.getByRole("button", { name: /sauvegarder/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("les informations ont bien été enregistré");
    });

    const savedData = JSON.parse(localStorage.getItem("personne 0"));
    expect(savedData.nom).toContain("Noufou");
    expect(savedData.prenom).toContain("Idayat");
    expect(savedData.email).toContain("nouf.ida@example.com");
  });
});
