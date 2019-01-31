import { Logger } from '../logger/logUtils';

export const mutationsErrorsHandler = ({
  showSnackbar = true,
  hideLoadingFunction = null,
  setSubmittingFunction = null,
}) => ({ graphQLErrors = [] }) => {
  if (navigator.onLine) {
    Logger.error(JSON.stringify(graphQLErrors));
  }
  const message =
    graphQLErrors.map(e => e.message).join('\n') || 'Erro de Conexão';
  const title = 'Erro!';
  if (hideLoadingFunction) {
    hideLoadingFunction();
  }
  if (setSubmittingFunction) {
    setSubmittingFunction();
  }

  const params = { title, message };

  if (showSnackbar) {
    params.chip = true;
    params.variant = 'error';
    params.text = `${title}:${message}`;
    showSnackbar(params);
  }
};
