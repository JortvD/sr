import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { loggedIn } from '../client';
import { FolderCollapseList } from '../components/folder/FolderCollapseList';
import { PageContainer } from '../components/PageContainer';
import { ThemeProvider } from '@mui/material';
import { defaultTheme } from '../mui';
import { Review } from '../components/card/Review';

export const Route = createLazyFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate();

  if(!loggedIn()) {
    navigate({ to: '/login' });
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <PageContainer>
        <Review />
        <FolderCollapseList />
      </PageContainer>
    </ThemeProvider>
  )
}
