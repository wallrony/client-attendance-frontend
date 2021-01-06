import { RouteProps } from "react-router-dom";
import BrowserProps from "./BrowserProps";

/**
 * Interface AppPage - Utilizada para identificar todas as
 * páginas da aplicaçãp
 */
interface AppPage {
  /**
   * Propriedades passadas pelo Switch do React Router DOM,
   * como uma instância do useLocation, pathname, entre outros.
   * Essas propriedades servem para manipular as informações
   * da rota onde a página foi renderizada.
   */
  routeProps: RouteProps;
  
  // Título da página.
  pageTitle: string;

  /**
   * A função PanicError é uma função passada na raiz da aplicação
   * (AppRouter) verificando se algum erro que ocorreu durante a
   * execução de funcionalidades na página não pode ser tratado ainda
   * na página. Assim, o método retorna uma confirmação se a página pode
   * continuar sua execução normal e não alterar nenhuma possível
   * variável posterior importante.
   */
  verifyPanicError: (error: string) => boolean;
  browserProps?: BrowserProps;
}

export default AppPage;
