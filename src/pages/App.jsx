import './App.css';
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from '../components/Navigation/Navigation';

const HomePage = lazy(() => import('./HomePage/HomePage'));
const MoviesPage = lazy(() => import('./MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() =>
  import('./MovieDetailsPage/MovieDetailsPage')
);
const NotFoundPage = lazy(() => import('./NotFoundPage'));
const MovieCast = lazy(() => import('../components/MovieCast/MovieCast.jsx'));
const MovieReviews = lazy(() =>
  import('../components/MovieReviews/MovieReviews.jsx')
);

function App() {
  return (
    <div>
      <Navigation />
      <Suspense fallback={<div>Loading more...</div>} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Route>{' '}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
