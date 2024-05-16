import { Badge, Button, Card, TextInput, Title } from "@tremor/react";
import { useState } from "react";
import { useUserAction } from "../hooks/useUserActions";

export function CreateNewUser() {
   const { addUser } = useUserAction();
   const [result, setResult] = useState<'ok'| 'ko' | null>(null)

   const handleSubmit = (event: React.FormEvent<HTMLFormElement>)  =>{
      event.preventDefault();
      setResult(null);

      const form = event.target as HTMLFormElement;
      const formData = new FormData(form);

      const Nombre = formData.get('Nombre') as string;
      const Apellido = formData.get('Apellido') as string; 
      const Edad = formData.get('Edad') as string;
      const Nacionalidad = formData.get('Nacionalidad') as string;
      const Genero = formData.get('Genero') as string;
      const Email = formData.get('Email') as string;

      if(!Nombre || !Apellido || !Edad || !Nacionalidad || !Genero || !Email){
       return setResult('ko')
      }

      addUser({Nombre, Apellido, Edad, Nacionalidad, Genero, Email});
      setResult('ok');
      form.reset();
   };

  return (
    <Card style={{ marginTop: "16px" }}>
      <Title>Crear nuevo usuario</Title>
      <form onSubmit={handleSubmit} className="">
        <TextInput name='Nombre' placeholder="Nombre" />
        <TextInput name='Apellido' placeholder="Apellido" />
        <TextInput name='Edad' placeholder="Edad"/>
        <TextInput name='Nacionalidad' placeholder="Nacionalidad" /> 
        <TextInput name='Genero' placeholder="Genero" />{" "}
        <TextInput name='Email' placeholder="Email" />

        <div>
         <Button
            type="submit"
            style={{ marginTop: "16px" }}>
               Crear usuario
         </Button>
         <span>
          {result === 'ok' && (<Badge color='green'>Guardado</Badge>)}
          {result === 'ko' && <Badge color='red'>Error</Badge>}
         </span>
        </div>
      </form>
    </Card>
  );
}
