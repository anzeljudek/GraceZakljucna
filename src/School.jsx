import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default function School(props) {
  const { regija, obcina, naziv, naslov, postna_stevilka, posta, email } =
    props.data;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{naziv}</CardTitle>
        <CardDescription>{obcina}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          <strong>Naslov:</strong> {naslov}, {postna_stevilka} {posta}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
      </CardContent>
    </Card>
  );
}
