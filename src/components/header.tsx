import { Container } from "./container";
import { Logo } from "./logo";

export const Header = () => {
  return (
    <Container
      elem="header"
      className="sticky top-0 inset-x-0 h-16 flex items-center bg-background z-50"
    >
      <Logo/>
    </Container>
  );
};
