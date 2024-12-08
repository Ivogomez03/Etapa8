package isi.deso.model;
import jakarta.persistence.*;
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author Francisco
 */

@Entity
public class Coordenada {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_coordenadas", nullable = false)
    private long id;
    @Column
    private double latitud;
    @Column
    private double longitud;
    
    public Coordenada(){
        this.latitud=0;
        this.longitud=0;
    }
    
    public Coordenada(double lat, double lng){
       this.latitud=lat;
       this.longitud=lng;
    }
    
    public void println(){
        System.out.println("latitud: "+ this.latitud + "longitud: " + this.longitud);
    }
    
    public double getLat(){
        return this.latitud;
    }
    public double getLng(){
        return this.longitud;
    }
    public long getId(){
        return this.id;
    }
    public void setLat(double lat){
        this.latitud = lat;
    }
    public void setLng(double lng){
        this.longitud = lng;
    }
    
}
