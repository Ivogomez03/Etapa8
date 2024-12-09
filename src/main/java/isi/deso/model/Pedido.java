/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package isi.deso.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author ivogo
 */
@Data
@Entity
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pedido", nullable = false)
    private int id;

    @OneToMany(mappedBy = "pedido", cascade = CascadeType.PERSIST)
    private List<ItemsPedido> detalle;

    @Enumerated(EnumType.STRING)
    private Estado estado;

    @ManyToOne
    @JoinColumn(name = "id_cliente")
    public Cliente cliente;

    @OneToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "id_pago")
    public Pago pago;

    @ManyToOne
    @JoinColumn(name = "id_vendedor", referencedColumnName = "id_vendedor")
    public Vendedor vendedor;

    public Pedido() {
        this.estado = Estado.PENDIENTE;
        this.detalle = new ArrayList<ItemsPedido>();
    }

}