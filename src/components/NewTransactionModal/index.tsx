import * as Dialog from "@radix-ui/react-dialog";
import { CloseButton, Content, Overlay } from "./styled";
import { X } from "phosphor-react";

export function NewTransactionModal() {
  return (
    /* O dialog portal, deixa o elemento fora do escopo do Header */
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Nova transação</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form>
          <input type="text" placeholder="Descrição" required />
          <input type="number" placeholder="Preço" required />
          <input type="text" placeholder="Categoria" required />
          <button type="submit">Cadastrar</button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
