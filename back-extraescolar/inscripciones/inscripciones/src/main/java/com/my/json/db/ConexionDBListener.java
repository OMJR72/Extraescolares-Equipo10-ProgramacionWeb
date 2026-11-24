package com.my.json.db;

import jakarta.servlet.ServletContextEvent;
import jakarta.servlet.ServletContextListener;
import jakarta.servlet.annotation.WebListener;

@WebListener
public class ConexionDBListener implements ServletContextListener {

    @Override
    public void contextDestroyed(ServletContextEvent event) {
        ConexionDB.cerrar();
    }
}
