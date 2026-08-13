import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from './components/common/ErrorBoundary';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LoadingProvider } from './contexts/LoadingContext';
import { PetProvider } from './contexts/PetContext';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './routes/ProtectedRoute';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Browse from './pages/Browse';
import PetDetails from './pages/PetDetails';
import CreateListing from './pages/CreateListing';
import Profile from './pages/Profile';
import Reviews from './pages/Reviews';
import NotFound from './pages/NotFound';
import ComingSoon from './components/common/ComingSoon';

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <LoadingProvider>
          <AuthProvider>
            <PetProvider>
              <BrowserRouter>
                <Toaster
                  position="top-right"
                  toastOptions={{
                    duration: 3500,
                    style: {
                      borderRadius: '12px',
                      background: 'var(--color-surface)',
                      color: 'var(--color-text)',
                      boxShadow: 'var(--shadow-soft-lg)',
                    },
                  }}
                />
                <Routes>
                  <Route element={<MainLayout />}>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/browse" element={<Browse />} />
                    <Route path="/pets/:id" element={<PetDetails />} />
                    {/* <Route path="/reviews" element={<Reviews />} /> */}
                    <Route path="/about" element={<ComingSoon title="About PetLink" />} />
                    <Route path="/terms" element={<ComingSoon title="Terms of service" />} />
                    <Route path="/privacy" element={<ComingSoon title="Privacy policy" />} />
                    <Route
                      path="/add-pet"
                      element={
                        <ProtectedRoute>
                          <CreateListing />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/profile"
                      element={
                        <ProtectedRoute>
                          <Profile />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="*" element={<NotFound />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </PetProvider>
          </AuthProvider>
        </LoadingProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
