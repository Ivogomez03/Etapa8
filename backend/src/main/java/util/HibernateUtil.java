/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package util;

import org.hibernate.SessionFactory;
import org.hibernate.boot.Metadata;
import org.hibernate.boot.MetadataSources;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import java.util.logging.Logger;

public class HibernateUtil {
    private static StandardServiceRegistry registry;
    private static SessionFactory sessionFactory;
   
    public static SessionFactory getSessionFactory() {
        if (sessionFactory == null) {
            try {
            // Crear registro
                registry = new StandardServiceRegistryBuilder().configure().build();

                // Crear MetadataSources
                MetadataSources sources = new MetadataSources(registry);

                // Crear Metadata
                Metadata metadata = sources.getMetadataBuilder().build();

                // Crear SessionFactory
                sessionFactory = metadata.getSessionFactoryBuilder().build();
                
        } catch (Exception e) {
            System.err.println("Error al crear el SessionFactory");
            e.printStackTrace();
            if (registry != null)
                StandardServiceRegistryBuilder.destroy(registry);
        }
        }
        return sessionFactory;
    }

    public static void shutdown() {
        if (sessionFactory != null) {
            sessionFactory.close();
        }
        if (registry != null) {
            StandardServiceRegistryBuilder.destroy(registry);
        }
    }
}