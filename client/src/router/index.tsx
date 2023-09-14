import { Routes, Route, BrowserRouter } from 'react-router-dom';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/login" element={<h1>login</h1>} />
          <Route path="/register" element={<h1>register</h1>} />
        </Route>

        <Route path="/" element={<h1>Private</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
