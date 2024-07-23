import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
//No React Router, o BrowserRouter (renomeado como Router) é um componente que usa a API History do HTML5 para sincronizar a UI com a URL do navegador, facilitando navegações amigáveis e dinâmicas. Dentro dele, o componente Routes atua como um container para múltiplos Route, cada Route mapeia uma URL específica para um componente React, controlando assim qual componente é renderizado com base na URL acessada. Esses elementos juntos permitem a criação de uma navegação eficiente e organizada em aplicações web React. E o componente Navigate redireciona automaticamente de uma rota para outra.
import { Home } from "./views/home";
import { Artists } from "./views/artists";
import { Stages } from "./views/stages";
import { Performances } from "./views/performances";
import { AuthProvider } from "./contexts/authContext";
import { ProtectedRoute } from "./components/protectedRoute";
import { Login } from "./views/login";
import { AdminPanel } from "./views/adminPanel";
import { AdminPanelArtists } from "./views/adminPanelArtists";
import { AdminPanelStages } from "./views/adminPanelStages";
import { AdminPanelPerformances } from "./views/adminPanelPerformances";

export const AppRoutes = () => {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Navigate to="/" replace />} />
                    <Route path="/artists" element={<Artists />} />
                    <Route path="/stages" element={<Stages />} />
                    <Route path="/performances" element={<Performances />} />
                    <Route path="/login" element={<Login />} />
                    <Route 
                        path="/adminpanel" 
                        element={<ProtectedRoute component={AdminPanel} />} 
                    />
                    <Route 
                        path="/adminpanel/artists" 
                        element={<ProtectedRoute component={AdminPanelArtists} />} 
                    />
                    <Route
                        path="/adminpanel/stages" 
                        element={<ProtectedRoute component={AdminPanelStages} />} 
                    />
                    <Route 
                        path="/adminpanel/performances" 
                        element={<ProtectedRoute component={AdminPanelPerformances} />} 
                    />
                </Routes>
            </AuthProvider>
        </Router>
    )
}
