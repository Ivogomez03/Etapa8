/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Enum.java to edit this template
 */
package isi.deso.model;

/**
 *
 * @author ivogo
 */
public enum Estado {
    PENDIENTE, // El pedido todavia no fue aceptado.
    RECIBIDO, // El pedido fue aceptado, antes de ser preparado.
    PREPARACION, //El pedido se esta preparando.
    ENVIADO, // El pedido salio del restaurante.
    ENTREGADO, // El pedido se entrego al cliente.
    CANCELADO // El pedido fue cancelado.
}
