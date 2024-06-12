import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import School from "./School";
import { Grafi } from "./Grafi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Info from "./Info";
import { Input } from "@/components/ui/input";
import { Truck } from "lucide-react";

export default function App() {
  const [data, setData] = useState([]);
  const [obcine, setObcine] = useState([]);
  const [pop, setPop] = useState([]);
  const [izbranaObcina, setIzbranaObcina] = useState("all");
  const [izbranaPostnaStevilka, setIzbranaPostnaStevilka] = useState();
  const [search, setSearch] = useState("");
  const [buttonState, setButtonState] = useState(true);
  const [filter, setFilter] = useState([]);

  async function getSchools() {
    const response = await fetch("https://static.404.si/grace/");
    const data = await response.json();
    setData(data);
  }

  async function getMunicipality() {
    const response = await fetch("https://static.404.si/grace/obcine/");
    const data = await response.json();
    setObcine(data);
  }

  async function getPop() {
    const response = await fetch("https://static.404.si/grace/prebivalstvo/");
    const data = await response.json();
    setPop([Object.keys(data), Object.values(data)]);
  }

  useEffect(() => {
    setFilter(
      data
        .filter(
          (school) => izbranaObcina == "all" || school.obcina == izbranaObcina,
        )
        .filter(
          (school) =>
            izbranaPostnaStevilka == null ||
            school.postna_stevilka.toString().startsWith(izbranaPostnaStevilka),
        ),
    );
  }, [izbranaObcina, data]);

  useEffect(() => {
    getSchools();
    getMunicipality();
    getPop();
  }, []);

  return (
    <>
      <div className="container mb-4 mt-4">
        <div className="flex gap-4">
          {/* Ne pozabi na onValueChange event. */}
          <Select onValueChange={(value) => setIzbranaObcina(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Občine" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Vse občine</SelectItem>
              {obcine.map((obcina) => (
                <SelectItem value={obcina}>{obcina}</SelectItem>
              ))}
              {/* Uporabi map funkcijo, ki se bo sprehodila, čez vse občine in jih prikazala v obliki SelectItemov. */}
            </SelectContent>
          </Select>
          <Input
            placeholder="Vnesi poštno številko"
            onChange={(e) => setIzbranaPostnaStevilka(e.target.value)}
          />
          {/* Dodaj input, ki bo omogčal iskanje po poštni številki. Ne pozabi na onChange event. */}
          <Info filter={filter}></Info>
          <Button
            className="w-40"
            onClick={() => {
              if (buttonState == false) {
                setButtonState(true);
              } else {
                setButtonState(false);
              }
            }}
          >
            {buttonState ? "Prikaži graf" : "Skrij graf"}
          </Button>
        </div>
      </div>
      <div className="container">
        <div className={buttonState ? "hidden" : "block"}>
          <Grafi prebivalstvo={pop}></Grafi>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {/* Uporabi map funkcijo, ki se bo sprehodila, čez vse šole in jih prikazala v obliki kartic. */}
          {/* Dodaj dva filtra: enega za filtriranje po obcini, drugega za filtriranje glede na poštno številko šole. */}
          {data
            .filter(
              (school) =>
                izbranaObcina == "all" || school.obcina == izbranaObcina,
            )
            .filter(
              (school) =>
                izbranaPostnaStevilka == null ||
                school.postna_stevilka
                  .toString()
                  .startsWith(izbranaPostnaStevilka),
            )
            .map((school) => (
              <div>
                <School data={school}></School>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
