"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Combobox } from "./components/combobox";


export default function Home() {

  const [averageBill, setAverageBill] = useState('0');
  const [roof, setRoof] = useState('');
  const [steps, setSteps] = useState(0);

  useEffect(() => {
    console.log(steps);
  },[steps])

  return (
    <>
      {steps !== 0 && <Button onClick={() => setSteps(steps - 1)} variant="outline" size="icon">
        <ChevronLeft />
      </Button>}
      {steps === 0 &&
        <>
          <h2>Input your average monthly bill</h2>
          <Input value={averageBill} onChange={(event) => setAverageBill(event.target.value)} type="number" placeholder="Averge monthly bill in sek" />
        </>
      }
      {steps === 1 &&
        <>
          <h2>Select roof size</h2>
          <Combobox></Combobox>
        </>
      }
      {steps === 2 ?
        <>
          <h3>Monthly Savings</h3>
          <p>123</p>
        </>
        :
        <Button onClick={() => setSteps(steps + 1)} variant="outline">Next</Button>
      }

    </>
  );
}
