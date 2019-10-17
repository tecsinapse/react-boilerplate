import React, { Component } from 'react';
import SentimentVeryDissatisfied  from '@material-ui/icons/SentimentVeryDissatisfied';
import { Trans } from '@lingui/macro';
import { EmptyState } from '@tecsinapse/ui-kit/build/EmptyState/EmptyState';
import { Button } from '@tecsinapse/ui-kit/build/Buttons/Button';
import * as Sentry from '@sentry/browser';

export class OpsErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    Sentry.withScope(scope => {
      scope.setExtras(errorInfo);
      Sentry.captureException(error);
    });
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <EmptyState
          IconComponent={SentimentVeryDissatisfied}
          titleMessage={<Trans>Ops</Trans>}
          message={
            <Trans>Desculpe, há algo de errado com nosso servidor.</Trans>
          }
        >
          <Button component="a" variant="primary" href={window.location.origin}>
            <Trans>Voltar</Trans>
          </Button>
        </EmptyState>
      );
    }

    return children;
  }
}
