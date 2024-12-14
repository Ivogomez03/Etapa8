package isi.deso.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author Francisco
 */
@Getter
@Setter
@Entity
@Table(name = "cliente")
public class Cliente {
    @Id
    @Column(name = "id_cliente", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "CUIT", nullable = false)
    private String cuit;

    @Column(name = "direccion", nullable = false)
    private String direccion;

    @OneToOne(cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
    @JoinColumn(name = "id_coordenadas", referencedColumnName = "id_coordenadas")
    private Coordenada coordenadas;

    @OneToMany(mappedBy = "cliente", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Pedido> pedidos = new ArrayList<Pedido>();

    @Column(name = "activo", nullable = false)
    private boolean habilitado;

    public Cliente() {
        this.pedidos = new ArrayList<>();
        this.habilitado = true;
    }

    public Cliente(String email, String cuit, String direccion, double lat, double lng) {
        this.email = email;
        this.cuit = cuit;
        this.direccion = direccion;
        this.coordenadas = new Coordenada(lat, lng);
        this.habilitado = true;
    }

    public void addPedido(Pedido ped) {
        this.pedidos.add(ped);
    }

    public void setCoordenada(double lat, double lng) {
        this.coordenadas.setLat(lat);
        this.coordenadas.setLng(lng);
    }

    public void println() {
        System.out.println(this.getEmail() + " " + this.getDireccion() + " " + this.getCuit() + " {"
                + this.coordenadas.getLat() + "," + this.coordenadas.getLng() + "}");
    }

    public void notificarPedido(Estado e) {
        System.out.println("(Notificacion para cliente con id " + this.id + ") Su pedido esta en estado de " + e);
    }

}
