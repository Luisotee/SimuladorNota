import { Card } from "@rneui/base";
import { SquareActionButton, SquareInput } from "../styled-components/inputs";

export function EmptyCard() {
  return (
    <Card>
      <Card.Title>Input subject name</Card.Title>
      <Card.Divider />
      <SquareInput />
      <SquareActionButton />
    </Card>
  );
}
