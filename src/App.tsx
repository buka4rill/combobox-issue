import useLocalStorageState from 'use-local-storage-state';
import {
  Button,
  CenteredColumn,
  Card,
  Heading,
  Text,
  Logo,
  Input,
  Divider,
  marginX,
  marginY,
  PasswordInput,
  Link,
  getBackgroundColor,
  gap,
  darkTheme,
  Toggle,
  top,
  end,
  lightTheme,
  paddingY,
} from '@coachhubio/nova';
import styled, { ThemeProvider } from 'styled-components';

const Wrapper = styled(CenteredColumn)`
  justify-content: center;
  min-height: 100%;
  flex-shrink: 0;

  ${getBackgroundColor('background-color-subdued')}
  ${gap('3xl')}
  ${paddingY('3xl')}
`;

const LoginFormCard = styled(Card)`
  width: 480px;
  max-width: 90%;
  flex-direction: column;

  ${Divider} {
    ${marginX('l', { negative: true })}
    ${marginY('l')}
  }
`;

const ThemeSwitcher = styled(Toggle)`
  position: absolute;
  ${top('l')}
  ${end('l')}
`;

function App() {
  const [dark, setDark] = useLocalStorageState('dark', { defaultValue: false });

  return (
    <ThemeProvider theme={dark ? darkTheme : lightTheme}>
      <Wrapper>
        <Logo variant={dark ? 'PrimaryWhite' : 'Primary'} />
        <LoginFormCard padding="l">
          <Heading size="base">Welcome back</Heading>
          <Text size="s" marginTop="xs">
            CoachHub is the leading global talent development platform that enables organizations to create a
            personalized, measurable and scalable coaching program for the entire workforce, regardless of department
            and seniority level.
          </Text>
          <Divider />
          <Input label="Email" placeholder="nova@coachhub.com" />
          <PasswordInput label="Password" marginTop="base" placeholder="·······" />
          <Link href="#" modifier="bold" size="xs" marginTop="xs" alignSelf="start">
            Forgot your password?
          </Link>
          <Button variant="cta" size="l" marginTop="l" squared>
            Sign in
          </Button>
          <Button variant="secondary" size="l" marginTop="base" squared>
            Sign in with SSO
          </Button>
        </LoginFormCard>
      </Wrapper>
      <ThemeSwitcher label="Dark mode" checked={dark} onChange={setDark} />
    </ThemeProvider>
  );
}

export default App;
