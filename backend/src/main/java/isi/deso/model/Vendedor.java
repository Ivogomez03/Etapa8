package isi.deso.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

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
@Table(name = "vendedor")
public class Vendedor {
    @Id
    @Column(name = "id_vendedor", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "apellido")
    private String apellido;

    @Column(name = "direccion")
    private String direccion;

    @Column(name = "DNI")
    private String dni;

    @OneToOne(cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
    @JoinColumn(name = "id_coordenadas", referencedColumnName = "id_coordenadas")
    private Coordenada coordenadas;

    @OneToMany(mappedBy = "vendedor", fetch = FetchType.LAZY)
    private List<ItemMenu> items; // todos los items que vende

    @OneToMany(mappedBy = "vendedor", fetch = FetchType.LAZY)
    private List<Pedido> pedidosRecibidos; // lista de los pedidos que se le realizaron al vendedor

    public Vendedor() {
    }

    public Vendedor(String nombre, String apellido, String direccion, String dni, double lat, double lng,
            List<ItemMenu> items) {

        this.nombre = nombre;
        this.apellido = apellido;
        this.direccion = direccion;
        this.dni = dni;
        this.coordenadas = new Coordenada(lat, lng);
        this.items = items;
    }

    public void println() {
        System.out.println(this.getId() + " " + this.getNombre() + " " + this.getDireccion() + " {"
                + this.coordenadas.getLat() + "," + this.coordenadas.getLng() + "}");
    }

    public void distance(Cliente c) {
        final int radioTierra = 6371; // radio en km

        // Latitudes y Longitudes en radianes
        double latV = Math.toRadians(this.coordenadas.getLat());
        double lngV = Math.toRadians(this.coordenadas.getLng());
        double latC = Math.toRadians(c.getCoordenadas().getLat());
        double lngC = Math.toRadians(c.getCoordenadas().getLng());

        double difLat = latC - latV;
        double difLng = lngC - lngV;

        double a = Math.sin(difLat / 2) * Math.sin(difLat / 2)
                + Math.cos(latV) * Math.cos(latC)
                + Math.sin(difLng / 2) * Math.sin(difLng / 2);
        double e = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        double distance = radioTierra * e;

        System.out.println("Distancia entre vendedor y cliente: " + distance);
    }

    public void mostrarMenu() {
        for (int i = 0; i < this.items.size(); i++) {
            ItemMenu c = (ItemMenu) this.items.get(i);
            System.out.println("Plato " + (i + 1) + ": " + c.getNombre() + " $" + c.getPrecio());
            System.out.println("Descripcion: " + c.getDescripcion());
        }
    }

    public ArrayList<Pedido> buscarPorEstado(Estado e) {
        ArrayList<Pedido> pedidosPorEstado = new ArrayList<Pedido>();
        for (int i = 0; i < this.pedidosRecibidos.size(); i++) {

            Pedido pedidoEstado = (Pedido) this.pedidosRecibidos.get(i);

            if (pedidoEstado.getEstado() == e) {
                pedidosPorEstado.add(pedidoEstado);
            }
        }
        return pedidosPorEstado;

    }

    public void addPedido(Pedido p) {

        this.pedidosRecibidos.add(p);

    }

    public List getBebidas() {
        List bebidas = new ArrayList();
        for (int i = 0; i < this.items.size(); i++) {
            Bebida bebida = (Bebida) this.items.get(i);
            if (bebida.esBebida()) {
                bebidas.add(bebida);
            }
        }
        return bebidas;
    }

    public List getBebidasSinAlcohol() {
        List bebidas = new ArrayList();
        for (int i = 0; i < this.items.size(); i++) {
            Bebida aux = (Bebida) this.items.get(i);
            if (aux.esBebida() & aux.esBebidaAlcoholica()) {
                bebidas.add(aux);
            }
        }
        return bebidas;
    }

    public List getComidas() {
        List comidas = new ArrayList();

        for (int i = 0; i < this.items.size(); i++) {
            Plato aux = (Plato) this.items.get(i);
            if (aux.esComida()) {
                comidas.add(aux);
            }
        }
        return comidas;
    }

    public List getComidasVeganas() {
        List comidas = new ArrayList();

        for (int i = 0; i < this.items.size(); i++) {
            Plato aux = (Plato) this.items.get(i);
            if (aux.esComida() & aux.getAptoVegano()) {
                comidas.add(aux);
            }
        }
        return comidas;
    }

    public void setCoordenada(double lat, double lng) {
        this.coordenadas.setLat(lat);
        this.coordenadas.setLng(lng);
    }

    public void setListaArticulos(List articulos) {
        this.items = articulos;
    }

    public void addItem(ItemMenu item) {
        this.items.add(item);
    }

    public void addArticulos(List<ItemMenu> articulos) {
        for (int i = 0; i < articulos.size(); i++) {
            this.items.add(articulos.get(i));
        }
    }

}
