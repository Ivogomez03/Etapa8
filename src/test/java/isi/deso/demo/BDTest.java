/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package isi.deso.demo;


import org.hibernate.Session;
import org.hibernate.SessionFactory;
import util.HibernateUtil;
import java.util.logging.Logger;
import org.hibernate.HibernateException;
import org.junit.jupiter.api.Test;


public class BDTest {
    private static final Logger logger = Logger.getLogger(BDTest.class.getName());
    
    @Test
    void crearTablaTest() {
        SessionFactory sessionFactory = HibernateUtil.getSessionFactory();
        Session session = null;

        try {
            // 1. Abrir session en la Base de Datos
            session = sessionFactory.openSession();
            logger.info("Sesión abierta correctamente.");
        } catch (Exception e) {
            logger.info("Error al abrir la sesión");
        } finally {
            // 2. Cerrar la session
            if (session != null) {
                session.close();
                logger.info("Sesión cerrada correctamente.");
            }
            HibernateUtil.shutdown();
        }
    }
}
