import { render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Button Component", () => {
  test("renders a default button", () => {
    const { getByText } = render(<Button>Click here</Button>);
    expect(getByText("Click here")).toBeInTheDocument();
  });

  test("disables the button when isDisabled prop is true", () => {
    render(<Button isDisabled={true}>Click here</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  test("applies the correct css class for different button variants", () => {
    const { rerender } = render(<Button variant="primary">Click here</Button>);
    expect(screen.getByRole("button")).toHaveClass("btn-primary");

    rerender(<Button variant="info">Click here</Button>);
    expect(screen.getByRole("button")).toHaveClass("btn-info");
  });

  test("render the correct loadingText and loading component when we use isLoading button", () => {
    render(
      <Button isLoading={true} loadingText="Sending...">
        Click here
      </Button>
    );

    expect(screen.getByText("Sending...")).toBeInTheDocument();
    expect(screen.queryByText("Click here")).not.toBeInTheDocument();

    expect(screen.getByTestId("loading")).toHaveClass("loading");
  });

  test("applies correct size classes for diffrent size props", () => {
    const { rerender } = render(<Button size="tiny">Click here</Button>);
    expect(screen.getByRole("button")).toHaveClass("btn-xs");

    rerender(<Button size="large">Click here</Button>);
    expect(screen.getByRole("button")).toHaveClass("btn-lg");
  });

  test("applies correct shape classes for diffrent shape props", () => {
    const { rerender } = render(<Button shape="square">Click here</Button>);
    expect(screen.getByRole("button")).toHaveClass("btn-square");

    rerender(<Button shape="wide">Click here</Button>);
    expect(screen.getByRole("button")).toHaveClass("btn-wide");
  });
});
