import { changuePassword } from './actions';

const page = () => {
  return (
    <div>
      <form action={changuePassword}>
        <input
          required
          type="password"
          name="new_password"
          id="new_password"
          placeholder="Nueva contraseña"
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default page;
